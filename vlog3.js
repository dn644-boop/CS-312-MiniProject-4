let Names = []
let Titles = []
let Contents = []
let Vlogs = []
let Logins = []
let IDs = []
let Password = []
let UserNames = []
let Editing = false
let SelectedRow = 0
let SessionID = ""

function LoadLogins(){
    SessionID = sessionStorage.getItem("SessionID")
    //alert(SessionID)
    let File = './vlog3.json'
    fetch('./vlog3.json')
    .then(Res => Res.json())
    .then(Data => {

        for (let Item = 0; Item < Data.Vlogsite[0].length; Item++){
            let NewLog = []
            //alert(Data.Vlogsite[1][Item].CreatorID)
            NewLog.push(Data.Vlogsite[0][Item].ID)
            NewLog.push(Data.Vlogsite[0][Item].Password)
            NewLog.push(Data.Vlogsite[0][Item].Name)
            IDs.push(Data.Vlogsite[0][Item].ID)
            Password.push(Data.Vlogsite[0][Item].Password)
            UserNames.push(Data.Vlogsite[0][Item].Name)

            Logins.push(NewLog)
        }
    })
}

function LoadPosts(){
    let File = './vlog3.json'
    fetch('./vlog3.json')
    .then(Res => Res.json())
    .then(Data => {

        for (let Item = 0; Item < Data.Vlogsite[1].length; Item++){
            let NewVlog = []
            //alert(Data.Vlogsite[1][Item].CreatorID)
            NewVlog.push(Data.Vlogsite[1][Item].CreatorID)
            NewVlog.push(Data.Vlogsite[1][Item].Title)
            NewVlog.push(Data.Vlogsite[1][Item].Content)
            NewVlog.push(Data.Vlogsite[1][Item].Timestamp)

            Vlogs.push(NewVlog)
        }
        //alert(Vlogs)
        //alert(Vlogs.length)

        var Table = document.getElementById("skill-table")
        for (let Vlog = 0; Vlog < Vlogs.length + 1; Vlog++){
            var NextRow = Table.insertRow()
            var CellOne = NextRow.insertCell(0)
            var CellTwo = NextRow.insertCell(1)
            var CellThree = NextRow.insertCell(2)
            var CellFour = NextRow.insertCell(3)
            var CellFive = NextRow.insertCell(4)
            var CellSix = NextRow.insertCell(5)

            //alert(Vlogs)
            CellOne.textContent = Vlogs[Vlog][0]
            CellTwo.textContent = Vlogs[Vlog][1]
            CellThree.textContent = Vlogs[Vlog][2]
            CellFour.textContent = Vlogs[Vlog][3]

            var EditButton = document.createElement("button")
            EditButton.textContent = "Edit"
            EditButton.type = "button"
            EditButton.addEventListener("click", function(){
                SelectedRow = this.parentNode.parentNode
                if (SessionID == IDs[SelectedRow.rowIndex - 1]) {
                    alert("Edit Post #" + SelectedRow.rowIndex + " by typing in the new information in the input fields below and pressing submit")
                    Editing = true
                }
                else {
                    alert("That post is not yours to edit")
                    Editing = false
                }
            })
            CellFive.appendChild(EditButton)
    
            var DeleteButton = document.createElement("button")
            DeleteButton.textContent = "Delete"
            DeleteButton.type = "button"
            DeleteButton.addEventListener("click", function(){
                SelectedRow = this.parentNode.parentNode
                if (SessionID == IDs[SelectedRow.rowIndex - 1]) {
                    alert("Deleted Row " + SelectedRow.rowIndex)
                    Vlogs.splice(SelectedRow.rowIndex - 1, 1)
                    IDs.splice(SelectedRow.rowIndex - 1, 1)
                    SelectedRow.remove()
                }
                else {
                    alert("You can't delete that")
                }
            })
            CellSix.appendChild(DeleteButton)
        }
    });

    
}

function RecordPost(){
    var TitleInput = document.getElementById("title").value
    var ContentInput = document.getElementById("content").value
    if (TitleInput != "" && ContentInput != "") {
        if (Editing == false) {
            var Table = document.getElementById("skill-table")
            var NextRow = Table.insertRow()
            var CellOne = NextRow.insertCell(0)
            var CellTwo = NextRow.insertCell(1)
            var CellThree = NextRow.insertCell(2)
            var CellFour = NextRow.insertCell(3)
            var CellFive = NextRow.insertCell(4)
            var CellSix = NextRow.insertCell(5)

            var NewVlog = [];

            CellOne.textContent = SessionID
            CellTwo.textContent = TitleInput
            CellThree.textContent = ContentInput

            CellFour.textContent = new Date(Date.now())

            NewVlog.push(SessionID)
            NewVlog.push(TitleInput)
            NewVlog.push(ContentInput)
            NewVlog.push(new Date(Date.now()))

            Vlogs.push(NewVlog)

            alert(Vlogs)

            var EditButton = document.createElement("button")
            EditButton.textContent = "Edit"
            EditButton.type = "button"
            EditButton.addEventListener("click", function(){
                SelectedRow = this.parentNode.parentNode
                alert("Edit Post #" + SelectedRow.rowIndex + " by typing in the new information in the input fields below and pressing submit")
                Editing = true
            })
            CellFive.appendChild(EditButton)
    
            var DeleteButton = document.createElement("button")
            DeleteButton.textContent = "Delete"
            DeleteButton.type = "button"
            DeleteButton.addEventListener("click", function(){
                SelectedRow = this.parentNode.parentNode
                alert("Deleted Row " + SelectedRow.rowIndex)
                Vlogs.splice(SelectedRow.rowIndex - 1, 1)
                SelectedRow.remove()
            })
            CellSix.appendChild(DeleteButton)
        }
        else
        {
            Vlogs[SelectedRow.rowIndex - 1][0] = SessionID
            Vlogs[SelectedRow.rowIndex - 1][1] = TitleInput
            Vlogs[SelectedRow.rowIndex - 1][2] = ContentInput
            SelectedRow.firstElementChild.textContent = Names[SelectedRow.rowIndex - 1]
            SelectedRow.firstElementChild.nextElementSibling.textContent = Titles[SelectedRow.rowIndex - 1]
            SelectedRow.firstElementChild.nextElementSibling.nextElementSibling.textContent = Contents[SelectedRow.rowIndex - 1]
            SelectedRow.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent = new Date(Date.now())
            Editing = false
            alert("Successfully Edited Post #" + SelectedRow.rowIndex)
        }
    }
    else
    {
        alert("You forgot to fill something in silly!")
    }
}

function Login(){
    var IDInput = document.getElementById("userid").value
    var PasswordInput = document.getElementById("password").value
    //alert(IDs)
    //alert(IDInput)
    var Account = IDs.findIndex(ID => ID === IDInput)
    //alert(Account)
    if (Account != -1 && PasswordInput == Password[Account]) {
        alert("Welcome back " + UserNames[Account] + "!")
        SessionID = IDInput;
        sessionStorage.setItem("SessionID", IDInput);
        window.location.href = "vlog3.html";
    }
    else {
        alert("Invalid username/password!")
    }
}

function SignUp(){
    var NewID = document.getElementById("new-userid").value
    var NewPassword = document.getElementById("new-password").value
    var NewUser = document.getElementById("new-name").value
    if (IDs.findIndex(ID => ID === NewID) != -1 || UserNames.findIndex(ID => ID === NewUser) != -1) {
        alert("That ID/username is already taken!")
    }
    else {
        alert("Welcome " + NewUser + "!")
        //let File = JSON.parse(localStorage.getItem("Vlogs"));

        //File.Vlogsite[0].push({
        //    ID: NewID,
        //    Password: NewPassword,
        //    Name: NewUser
        //});

        //localStorage.setItem("Vlogs", JSON.stringify(File));
        SessionID = NewID;
        sessionStorage.setItem("SessionID", NewID);
        window.location.href = "vlog3.html";
    }
}

LoadLogins()
LoadPosts()