import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

// on frontend auth is handled by google provider, so we need only login route as of now.
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    // as on frontend I am using google provider for auth, so no need of password.
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All creadentials are required." });
    }

    if (email === "admin@admin" && password === "admin") {
      await prisma.user.upsert({
        where: {
          email: "admin@admin",
        },
        update: {},
        create: {
          email: "admin@admin",
          password: "admin",
          name: "admin",
        },
      });

      return res.status(200).json({ message: "success" });
    }

    // checking if email exits
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      return res.status(400).json({
        message: "user with this email does not exists, please sign up",
      });
    }

    if (userExists.password === password) {
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.log("auth-routes :: error :: ", error);

    res.status(500).json("Internal server error");
  }
});

router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "All creadentials are required." });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: username,
        password,
      },
    });

    if (user) {
      return res.status(200).json("Success");
    }
  } catch (error) {
    console.log("====================================");
    console.log("authroutes :: ", error);
    console.log("====================================");
    res.status(500).json("Internal server error");
  }
});

export default router;
