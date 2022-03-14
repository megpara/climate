import FieldItem from "./FormItem";

export const generateInitialValues = (keys) =>
  keys.reduce((pv, cv) => {
    let key = cv;
    if (typeof cv === "object") {
      key = cv.name;
    }
    return { ...pv, [key]: "" };
  }, {});

export const getInitialValues = (data) =>
  data.reduce((pv, cv) => {
    return { ...pv, [cv.name]: "" };
  }, {});

export const generateFields = (data) =>
  data.map((field) => (
    <FieldItem key={field.name} name={field.name} label={field.label} />
  ));

export const generateFieldMap = (data) =>
  Object.keys(data).reduce((pv, cv) => {
    return { ...pv, [cv]: cv };
  }, {});

export const generateForm = (keys) => {
  const data = keys.reduce((pv, cv) => {
    let key = cv;
    if (typeof cv === "object") {
      key = cv.name;
    }
    return {
      fields: { ...pv.fields, [key]: cv },
      initialValues: { ...pv.initialValues, [key]: "" },
    };
  }, {});

  return data;
};
