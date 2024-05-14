interface SaveFileParams {
  response: any;
  fileName: string;
  format: string;
}
const saveFile = ({ response, fileName, format }: SaveFileParams) => {
  const url = window.URL.createObjectURL(new Blob([response as any]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${fileName}.${format}`);
  document.body.appendChild(link);
  link.click();
};

export default saveFile;
