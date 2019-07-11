import { Storage } from "aws-amplify";
export async function s3Upload(file) {
 const filename = `${Date.now()}-${file.name}`; /*If the app is used heavily, this might not be the best method*/
 const stored = await Storage.vault.put(filename, file, {
	contentType: file.type
 });
 /* Storage.vault.put -> secret storage ; Storage.put -> public storage  */
 return stored.key;
}
export async function s3Delete(file){
  await Storage.vault.delete(file)
}
