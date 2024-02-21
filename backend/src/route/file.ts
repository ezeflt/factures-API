import express, { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { FilePdf } from "../entity/file.entity";
import { FileDataFromBody, FileSchema } from "../schema/FileSchema";
import { addFile, getUserFiles } from "../services/file.services";

const router: Router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "../../currentFile.pdf");
  const fileStream = fs.createWriteStream(filePath);
  const fileData = fs.readFileSync(filePath);
  const fileBlob = new Blob([fileData], { type: "application/pdf" });

  const fileDataFromBody = req.body as unknown as FileDataFromBody;

  if (!fileDataFromBody.description || !fileDataFromBody.price || !fileDataFromBody.user_id) {
    res.json({ response: false, message: "file empty " });
    return;
  }

  const { description, price, user_id } = fileDataFromBody;

  const invoiceData = {
    username: `user${user_id}`,
    items: { description: description, price: price },
    fileStream,
  };

  const filePdf = new FilePdf(invoiceData);
  filePdf.addPage();

  const fileSend: FileSchema = { fileBlob, user_id };
  const fileFromBdd: boolean = await addFile(fileSend);

  if (!fileFromBdd) {
    res.json({ response: false, message: "file not register to database" });
    return;
  }

  res.sendFile(filePath);
});

router.get("/files/:user_id", async(req: Request, res: Response) => {
  const userId = req.params.id as unknown as number;

  if (!userId) {
    res.json({ response: false, message: 'The user id is not found'});
    return
  }

  const files: FileSchema[] = await getUserFiles(userId);

  if (!files) {
    res.json({ response: false, message: 'The user has not files'});
    return
  }

  res.json({ response: true, message: 'The user has files', files });
});

module.exports = router;
