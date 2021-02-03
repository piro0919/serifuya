import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "components/templates/Layout";
import Seo from "components/templates/Seo";
import AboutComponent, {
  AboutProps as AboutComponentProps,
} from "components/organisms/About";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AnySchema } from "yup";
import { ToastContainer, toast } from "react-toastify";
import api from "lib/api";
import * as gtag from "lib/gtag";
import { getLngDict } from "lib/i18n";
import { useI18n } from "next-localization";
import withCreateComponentWithAuth, {
  CreateComponentWithAuthProps,
} from "hocs/withCreateComponentWithAuth";

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

export type AboutProps = CreateComponentWithAuthProps;

const About: NextPage<AboutProps> = ({ user }) => {
  const { t } = useI18n();
  const {
    errors,
    handleSubmit: reactHookFormHandleSubmit,
    register,
    setValue,
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
        body: yup.string().required(t("about.messageIsRequired")),
        email: yup
          .string()
          .required(t("about.emailAddressIsRequired"))
          .email(t("about.pleaseEnterTheCorrectEmailAddress")),
        name: yup.string().required(t("about.nameIsRequired")),
        subject: yup.string().required(t("about.subjectIsRequired")),
      })
    ),
  });
  const [disabled, setDisabled] = useState<AboutComponentProps["disabled"]>(
    false
  );
  const [status, setStatus] = useState<number | undefined>();
  const handleValid = useCallback<(data: FieldValues) => void>(
    async (data) => {
      if (user) {
        setDisabled(true);

        const { status } = await api.post("/mail", data);

        setStatus(status);

        return;
      }

      toast.warn(t("common.pleaseSignIn"));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t("common.pleaseSignIn"), user]
  );
  const handleSubmit = useMemo<AboutComponentProps["handleSubmit"]>(
    () => reactHookFormHandleSubmit(handleValid),
    [handleValid, reactHookFormHandleSubmit]
  );
  const watchSubject = watch("subject");

  useEffect(() => {
    Object.values(errors).forEach(({ message }) => {
      toast.error(message);
    });
  }, [errors]);

  useEffect(
    () => {
      if (typeof status === "undefined") {
        return;
      }

      if (status === 200) {
        gtag.event({
          action: "submit_form",
          category: "Contact",
          label: watchSubject,
        });

        toast.success(t("about.emailSentSuccessfully"));
      } else {
        toast.error(t("about.emailSentError"));
      }

      setDisabled(false);
      setStatus(undefined);
    } /* eslint-disable react-hooks/exhaustive-deps */,
    [
      status,
      t("about.emailSentSuccessfully"),
      t("about.emailSentError"),
      watchSubject,
    ]
    /* eslint-enable react-hooks/exhaustive-deps */
  );

  useEffect(() => {
    if (!user) {
      setValue("email", "");
      setValue("name", "");

      return;
    }

    const { displayName, email } = user;

    setValue("email", email);
    setValue("name", displayName);
  }, [setValue, user]);

  return (
    <>
      <Seo canonical="/about" title={t("common.aboutSerifuya")} />
      <Layout>
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const lngDict = await getLngDict(locale);

  return {
    props: {
      lngDict,
    },
  };
};

export default withCreateComponentWithAuth(About);
