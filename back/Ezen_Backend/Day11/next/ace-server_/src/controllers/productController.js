const { Product} = require('../models')
/*
Product.create() : 삽입
Product.findAll() -전체 조회/ findByPk() - pk로 조회/ findOne() -> 조회
Product.update() : 수정
Product.destroy(): 삭제
=> 모든 메서드는 Promise 기반이므로 async/await 사용 가능
*/
exports.createProduct = async(req, res)=>{
    try {
        const newProduct = req.body;
        console.log('newProduct: ',newProduct);
        const prod = await Product.create(newProduct)
        console.log('prod: ',prod);
        res.status(200).json(prod);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}//-----------------------------------

//GET /api/products?order=idDESC (?order=priceASC)
exports.listProduct = async(req,res)=>{
    try {
        const orderMap ={
            'idDESC':['id','DESC'],
            'priceASC':['price','ASC'],
            'priceDESC':['price','DESC']
        }
        const rawOrder = req.query.order;
        const order = orderMap[rawOrder] ||['id','DESC'];

        // const prodList  = await Product.findAll();
        const {count, rows} = await Product.findAndCountAll({
            attributes:['id','name','price','image_url','spec'], //컬럼명 기술
            order:[order],
            // order: [['id', 'DESC']],
            // limit: 5,
            // offset: 0
        });//count도 가져오고 모든 상품목록도 함께 가져옴

        const prodList={
            products: rows,
            totalCount:count
        }
        res.status(200).json(prodList)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}//----------------------------------- 
//api/products/1
exports.getProduct = async (req,res)=>{
    try {
        const {id}=req.params;
        if(!id) return res.status(400).json({message:'잘못된 요청입니다'})
        const prod = await Product.findByPk(id)    ;
        if(!prod) return res.status(404).json({message:'존재하지 않는 상품입니다'})
        res.status(200).json(prod);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}//----------------------------------- 
//delete /api/products/1
exports.deleteProduct = async (req,res)=>{
    try {
        const {id}=req.params;
        const result = await Product.destroy({where:{id}});
        if(result===0){
            return res.json({result:'fail',message:'없는 상품입니다'})
        }
        res.json({result:'success',message:`${id}번 상품정보를 삭제했습니다`})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}//----------------------------------- 
exports.updateProduct = async (req,res)=>{
    try {
        const {id} = req.params;//수정할 상품번호
        const product = req.body; //수정한 상품정보
        const [result] = await Product.update(product, {where: {id}});
        console.log('result: ',result);
        if(result===0){
            return res.json({result:'fail',message:'상품 수정 실패'})
        }

        res.json({result:'success',message:`${id}번 상품을 수정했어요`})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}