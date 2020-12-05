import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import Layout from "components/templates/Layout";
import Head from "components/templates/Head";
import AboutComponent, { AboutProps } from "components/organisms/About";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AnySchema } from "yup";
import { ToastContainer, toast } from "react-toastify";
import api from "api";
import * as gtag from "lib/gtag";

type FieldValues = {
  body: string;
  email: string;
  name: string;
  subject: string;
};

type NextShape = {
  body: AnySchema<string>;
  email: AnySchema<string>;
  name: AnySchema<string>;
  subject: AnySchema<string>;
};

const About: NextPage = () => {
  const {
    errors,
    handleSubmit: reactHookFormHandleSubmit,
    register,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      body: "",
      email: "",
      name: "",
      subject: "",
    },
    resolver: yupResolver(
      yup.object().shape<NextShape>({
        body: yup.string().required("内容を入力してください"),
        email: yup
          .string()
          .required("メールアドレスを入力してください")
          .email("正しいメールアドレスを入力してください"),
        name: yup.string().required("名前を入力してください"),
        subject: yup.string().required("件名を入力してください"),
      })
    ),
  });
  const [disabled, setDisabled] = useState<AboutProps["disabled"]>(false);
  const [status, setStatus] = useState<number | undefined>();
  const handleValid = useCallback<(data: FieldValues) => void>(async (data) => {
    setDisabled(true);

    const { status } = await api.post("/mail", data);

    setStatus(status);
  }, []);
  const handleSubmit = useMemo<AboutProps["handleSubmit"]>(
    () => reactHookFormHandleSubmit(handleValid),
    [handleValid, reactHookFormHandleSubmit]
  );
  const watchSubject = watch("subject");

  useEffect(() => {
    Object.values(errors).forEach(({ message }) => {
      toast.error(message);
    });
  }, [errors]);

  useEffect(() => {
    if (typeof status === "undefined") {
      return;
    }

    if (status === 200) {
      gtag.event({
        action: "submit_form",
        category: "Contact",
        label: watchSubject,
      });

      toast.success("メールの送信に成功しました");
    } else {
      toast.error("メールの送信に失敗しました");
    }

    setDisabled(false);
    setStatus(undefined);
  }, [status, watchSubject]);

  return (
    <>
      <Layout>
        <Head title="せりふやについて" />
        <AboutComponent
          disabled={disabled}
          handleSubmit={handleSubmit}
          ref={register}
        />
      </Layout>
      <ToastContainer position="bottom-right" style={{ fontSize: "1.4rem" }} />
    </>
  );
};

export default About;
