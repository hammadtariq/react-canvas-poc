import { notification } from "antd";

type toastObj = {
  key: Number;
  message: String;
  description: String;
  onClick: Function;
};

export const toastMessage = (type: String, description: String, title?: String, obj?: toastObj, onClick = () => {}) => {
  const object = obj || {
    key: 1,
    message: "",
    description: "",
    onClick: () => {},
  };
  object.key = Date.now();

  if (type === "success") {
    object.message = title || "Success";
  }
  if (type === "info") {
    object.message = title || "Info";
  }
  if (type === "warning") {
    object.message = title || "Warning";
  }
  if (type === "error") {
    object.message = title || "Error";
  }

  object.description = description || object.description;

  object.onClick = () => {
    if (onClick) onClick();
    notification.close(String(object.key));
  };

  //   return notification[type]({
  // ...object,
  //   });
};
