const List = require("../models/list");
const jwt = require("jsonwebtoken");

const list_get = async (req, res) => {
  const { id: userId } = req.user;
  let list = await List.findOne({ createdby: userId });
  if (list) {
    list = list.list;
    res.render("mylist", { list: list });
  } else {
    res.render("mylist", { list: null });
  }

};

const list_post = async (req, res) => {
  const { title, content } = req.body;
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "secret", async (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        const { id: userId, name } = decodedToken;
        let find = await List.findOne({ createdby: userId });
        if (find) {
          const newItem = { title, content };
          find.list.push(newItem);
          const list = await List.findOneAndUpdate(
            { createdby: userId },
            { list: find.list }
          );
          res.json({ item: "done" });
        } else {
          const list = await List.create({
            createdby: userId,
            list: [{ title, content }],
          });
          res.json({ item: "done" });
        }
      }
    });
  } else {
    res.redirect("/login");
  }
};

const item_get = async (req, res) => {
  const itemId = req.params.id;
  const { id: userId } = req.user;
  let item = await List.findOne({ createdby: userId }).select({
    list: { $elemMatch: { _id: itemId } },
  });
  item = item.list[0];
  res.render("item", { item });
};



const item_patch = async (req, res) => {
  const itemId = req.params.id;
  const token = req.cookies.jwt;
  const {title,content}=req.body
  let userId 
  
  if (token) {
    jwt.verify(token, "secret", (err, decode) => {
      if (decode) {
        userId = decode.id;
      }
      if (err) {
        res.redirect("/login");
      }
    });
  } else {
    res.redirect("/login");
  }

  if (userId) {

      let item=await List.findOneAndUpdate({createdby:userId,list:{$elemMatch:{_id:itemId}}},{$set:{'list.$.title' : title,'list.$.content' : content}},{new:true})
      if(item){
        res.json({update:true})
      }
  }
  else{
    console.log("no userId")
  }
};

const iteme_delete=async(req,res)=>{
    const itemId = req.params.id;
    const token = req.cookies.jwt;
    let userId 
    if (token) {
      jwt.verify(token, "secret", (err, decode) => {
        if (decode) {
          userId = decode.id;
        }
        if (err) {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }

    if(userId){
        const list=await List.findOneAndUpdate({createdby:userId},{$pull:{list:{_id:itemId}}})
        res.json({res:list})
    }else{
        res.redirect("/login")
    }
}

module.exports = { list_get, list_post, item_get, item_patch ,iteme_delete};


