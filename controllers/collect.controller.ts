import { Request, Response, Router } from "express";
import { isLoggedIn } from "../middelware";
import { CollectService } from "../services/collect.service";

export class CollectController {
  public router = Router();

  // wrapMethod(
  //   method: (req: Request, res: Response) => string | Promise<string>
  // ) {
  //   method = method.bind(this);
  //   return async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       let json = await method(req, res);
  //       res.json(json);
  //     } catch (error) {
  //       next(error);
  //     }
  //   };
  // }
  
  constructor(private collectService: CollectService) {
    this.router.post("/user/collection", isLoggedIn, this.collectBook);
    this.router.post("/user/collected", isLoggedIn, this.collectedBook)
    this.router.delete("/user/cancelCollect",isLoggedIn, this.cancelCollection)
    // this.router.post("/user/collectBook",this.collectBook)
  }

  collectBook = async (req: Request, res: Response) => {
    try {
      let iAmBatMan = req.body;
      let user_id = req.session.user_id!
      // let iAmBatMan =req.body.book_id
      // console.log("I am Bat Man:",iAmBatMan.book_id);
      const book_id = await this.collectService.convertBookNameToId(iAmBatMan.book_id);
      if (book_id) {
        await this.collectService.saveBook(parseInt(book_id), user_id)
      }
      // console.log("collectBook book_id: , book_id")
      const userBooks = await this.collectService.getCollectedBookByUserId(user_id);
      res.json({
        userBooks,
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({
        message: e,
      });
    }
  };

  collectedBook = async (req:Request, res:Response)=>{
    try {
      let user_id = req.session.user_id
      let result = await this.collectService.getCollectedBookByUserId(user_id!);

      // console.log("i am iron man:",result)
      res.status(200).json({
        data: result
      })
    }catch(e){
      res.status(400).json({
        message: e
      })
    }
  }

  cancelCollection = async (req:Request,res:Response)=>{
    try{
      let book_id = req.body.book_id
      let user_id = req.session.user_id
      
      
      let result = await this.collectService.disCollection(book_id,user_id!)

      res.status(200).json({
        data:result
      })
    }catch(e){
      res.status(400).json
      message:e
    }
  }
}
//    async collectBookName(req:Request,res:Response){
//     try{
//         if(req.body.book_id)
//         {
//             res.json({message:"i got the book"})
//         }
//     }catch(e){
//         console.error(e)
//         res.status(400).json({
//             message:e
//         })
//     }
//    }
// }
