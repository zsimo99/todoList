// style
let inputs = document.querySelectorAll(".form-cont input");
function styleInp() {
  inputs = document.querySelectorAll(".form-cont input");
  if (inputs) {
    inputs.forEach((input) => {
      input.addEventListener("blur", (e) => {
        if (e.target.value != "") {
          e.target.parentElement.children[1].classList.add("fix-label");
        } else {
          e.target.parentElement.children[1].classList.remove("fix-label");
        }
      });
    });
  }
}
styleInp();

const btnsee = document.querySelectorAll(".see");
if (btnsee) {
  btnsee.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      location.assign(`/mylist/${e.target.value}`);
    });
  });
}
const back = document.querySelector(".back");
if (back) {
  back.addEventListener("click", () => {
    location.assign("/mylist");
  });
}

// add item

const popups = document.querySelector(".show-popup");
if (popups) {
  popups.addEventListener("click", (e) => {
    e.preventDefault();

    const cont = document.createElement("div");
    const box = document.createElement("div");
    const formContTitle = document.createElement("div");
    const formContContent = document.createElement("div");
    const titleLabel = document.createElement("label");
    const contentLabel = document.createElement("label");
    const titleInput = document.createElement("input");
    const contentInput = document.createElement("input");
    const remove = document.createElement("span");
    const send = document.createElement("button");

    titleLabel.textContent = "Title";
    contentLabel.textContent = "Content";
    remove.textContent = "X";
    send.textContent = "Send";

    send.id = "add-item";
    contentInput.id = "content";
    titleInput.id = "title";

    send.className = "btn btn-primary";
    cont.classList.add("popup-cont");
    box.classList.add("popup-box");
    formContTitle.classList.add("form-cont");
    formContContent.classList.add("form-cont");
    remove.classList.add("remove");

    remove.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
    });

    formContTitle.appendChild(titleInput);
    formContTitle.appendChild(titleLabel);

    formContContent.appendChild(contentInput);
    formContContent.appendChild(contentLabel);

    formContTitle.style.marginBottom = "20px";
    send.style.marginTop = "20px";

    box.appendChild(remove);
    box.appendChild(formContTitle);
    box.appendChild(formContContent);
    box.appendChild(send);
    cont.appendChild(box);
    document.body.appendChild(cont);
    styleInp();
    create_item();
  });
}

function create_item() {
  document.getElementById("add-item").addEventListener("click", async (e) => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (title != "" && content != "") {
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
      const res = await fetch("/mylist", {
        body: JSON.stringify({ title, content }),
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.item) {
        location.reload();
      }
    }
  });
}

const btnDelete = document.querySelector(
  ".item-cont .item-box .btn-cont button.delete"
);

const btnUpdate = document.querySelector(
  ".item-cont .item-box .btn-cont button.update"
);

if(btnUpdate){
    btnUpdate.addEventListener("click",()=>{
        const cont = document.createElement("div");
        const box = document.createElement("div");
        const formContTitle = document.createElement("div");
        const formContContent = document.createElement("div");
        const titleLabel = document.createElement("label");
        const contentLabel = document.createElement("label");
        const titleInput = document.createElement("input");
        const contentInput = document.createElement("input");
        const remove = document.createElement("span");
        const send = document.createElement("button");
    
        titleLabel.textContent = "Title";
        contentLabel.textContent = "Content";
        remove.textContent = "X";
        send.textContent = "Send";
    
        send.id = "update";
        contentInput.id = "content";
        titleInput.id = "title";
    
        send.className = "btn btn-primary";
        cont.classList.add("popup-cont");
        box.classList.add("popup-box");
        formContTitle.classList.add("form-cont");
        formContContent.classList.add("form-cont");
        remove.classList.add("remove");
    
        remove.addEventListener("click", (e) => {
          e.target.parentElement.parentElement.remove();
        });
    
        formContTitle.appendChild(titleInput);
        formContTitle.appendChild(titleLabel);
    
        formContContent.appendChild(contentInput);
        formContContent.appendChild(contentLabel);
    
        formContTitle.style.marginBottom = "20px";
        send.style.marginTop = "20px";
    
        send.addEventListener("click",async(e)=>{
            const title=titleInput.value
            const content=contentInput.value
            let res=await fetch(window.location.href,{
                body: JSON.stringify({ title, content }),
                method: "PATCH",
                headers: { "content-type": "application/json" },
              })
              const data=await res.json()
              if(data.update){
                location.reload()
              }
        })
    
        box.appendChild(remove);
        box.appendChild(formContTitle);
        box.appendChild(formContContent);
        box.appendChild(send);
        cont.appendChild(box);
        document.body.appendChild(cont);
        styleInp();
    })
    
    
}
if(btnDelete){
  btnDelete.addEventListener("click",async()=>{
    let res=await fetch(window.location.href,{
      method:"DELETE",
      headers: { "content-type": "application/json" },
    })
    const data=await res.json()
    if(data.res){
      location.assign("/mylist")
    }
  })
}