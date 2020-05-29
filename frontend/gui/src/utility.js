import cloneDeep from "lodash";

export const updateObjectProperties = (object, properties) => {
    return { ...cloneDeep(object), ...cloneDeep(properties) };
};
export const deleteObjectProperty = (object, property) => {
    let deepClone = cloneDeep(object);
    delete deepClone[property];
    return deepClone;
};
export const deleteObjectProperties = (object, properties) => {
  
  let deepClone = cloneDeep(object);
  for (let prop of properties){
    delete deepClone[prop];
  }
  return deepClone;
};
export const filterObjectProperties = (object, properties) => {
    let deepClone = cloneDeep(object);
    return Object.keys(deepClone)
        .filter((key) => properties.includes(key))
        .reduce((obj, key) => {
            obj[key] = deepClone[key];
            return obj;
        }, {});
};
