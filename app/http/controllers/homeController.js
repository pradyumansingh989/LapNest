const Menu = require('../../models/menu'); 

function homeController(){
    //factory functions -> a simple function that returns an object
    return {
        async index(req,res){
            const laptops = await Menu.find()
            // console.log(laptops)
            return res.render('home',{laptops:laptops})
            
        }
    }
}

module.exports = homeController