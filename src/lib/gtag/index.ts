export const pageview = (url: string) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: Parameters<Window["gtag"]>[1];
  category: Parameters<Window["gtag"]>[2]["event_category"];
  label: Parameters<Window["gtag"]>[2]["event_label"];
  value?: Parameters<Window["gtag"]>[2]["value"];
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
