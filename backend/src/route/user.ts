import express, { Request, Response } from "express";
import { login, register } from "../services/user.services";
import { UserData, User } from "../schema/UserSchema";
const router = express.Router();


router.post("/register", async(req: Request, res: Response) => {
    const userData = req.body as unknown as UserData;

    if (!userData.email || !userData.username || !userData.password ) {
      res.json({ response: false, message: "the user data is empty"});
      return
    }

    const userRegister: User = await register(userData);

    if (!userRegister) {
      res.json({ response: false, message: "the user is not register"});
      return
    }

    res.json({ response: true, message: "the user is register", user_id: userRegister.insertId });
  });

router.post("/login", async(req: Request, res: Response) => {
  const userData = req.body as unknown as UserData;

  if (!userData.email || !userData.password ) {
    res.json({ response: false, message: "the user data is empty"});
    return
  }

  const userFromBdd: UserData = await login(userData);

  if (!userFromBdd) {
    res.json({ response: false, message: "the email or password is not valid"});
    return
  }

  res.json({ response: true, message: "the user is valid", userFromBdd});
});

module.exports = router;
