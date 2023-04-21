export const parseJSONP = (jsonp: any) => {
  let start = jsonp.indexOf('{');
  let end = jsonp.lastIndexOf('}');
  let json = jsonp.substring(start, end + 1);
  return JSON.parse(json);
}