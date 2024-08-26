export const base64ToBlob = (base64: string, contentType: string) => {
  const byteCharacter = atob(base64.split(",")[1]);
  console.log("byte character is: ", byteCharacter);

  const byteNumber = new Array(byteCharacter.length);
  for (let i = 0; i < byteCharacter.length; i++) {
    byteNumber[i] = byteCharacter.charCodeAt(i);
  }
  console.log("Byte number is: ", byteNumber);
  const byteArray = new Uint8Array(byteNumber);
  console.log(byteArray);

  return new Blob([byteArray], { type: contentType });
};
