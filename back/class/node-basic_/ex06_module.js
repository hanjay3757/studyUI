//module.exports = 객체 1개
const area={
    square:function(len){ //정사각형 면적
        return len*len;
    },
    circle:function(radius){
        return Math.PI * radius* radius; //원의 면적
    },
    triangle: function(w, h){//직삼각형 면적
        return (w*h)/2;
    }
}
module.exports = area;
//ex06_require.js에서 require해서 square(),circle(),triangle()호출해보세요