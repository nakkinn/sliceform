//スリットフォームの設計図（svgファイル）を出力する

//入力　2変数関数　板の数　板の幅　隙間の幅（板の高さは2変数関数で調整）

let path;
let pathgroup = [];

let board_num;
let board_wid;
let slit_thick;

let error;

let input1;
let input2;
let input3;
let input4;

let button1;

function setup(){

    createCanvas(800, 800);

    input1 = createInput();
    input1.position(120, 20);
    input1.value('5');  //板の数　初期値
    input1.style('width','100px');
    input1.changed(update);

    input2 = createInput();
    input2.position(120, 50);
    input2.value('50'); //大きさ　初期値
    input2.style('width','100px');
    input2.changed(update);

    input3 = createInput();
    input3.position(120, 80);
    input3.value('0.5');    //スリットの幅　初期値
    input3.style('width','100px');
    input3.changed(update);

    input4 = createInput();
    input4.position(120, 110);
    input4.value('x*x-y*y+1');  //数式　初期値
    input4.style('width','200px');
    input4.changed(update);
    
    button1 = createButton('SVGダウンロード');
    button1.position(20, 140); 
    button1.mousePressed(downloadevent);


    update();

}

function draw(){

    background(240);

    noStroke();
    fill(0);

    text('板の数', 20, 26);
    text('大きさ', 20, 56);
    text('スリット幅', 20, 86);
    text('2変数関数', 20, 116);

    fill(255, 0, 0);
    if(error)   text('error', 20, 176);

    //重ねて描画

    stroke(0);
    translate(10, 600);

    push();
    scale(240/board_wid);
    strokeWeight(0.25);

    for(let k=0; k<board_num; k++){
        for(let i=0; i<pathgroup[k].length; i++){
            for(let j=0; j<pathgroup[k][i].length-1; j++){
                line(pathgroup[k][i][j][0], pathgroup[k][i][j][1], pathgroup[k][i][j+1][0], pathgroup[k][i][j+1][1])
            }
        }
    }

    pop();

    translate(400,0);

    push();
    scale(240/board_wid);
    strokeWeight(0.25);

    for(let k=board_num; k<board_num*2; k++){
        for(let i=0; i<pathgroup[k].length; i++){
            for(let j=0; j<pathgroup[k][i].length-1; j++){
                line(pathgroup[k][i][j][0], pathgroup[k][i][j][1], pathgroup[k][i][j+1][0], pathgroup[k][i][j+1][1])
            }
        }
    }

    pop();
}



function downloadevent(){
    if(!error)  createsvgfile(path);
}


function update(){

    board_num = Number(input1.value());   //板の数
    board_wid = Number(input2.value());  //板の幅
    slit_thick = Number(input3.value());   //スリット幅
    
    const roughness = 100;  //曲線を何分割した直線で表すか

    error = false;

    pathgroup = [];

    let maxhei = [];

    //２変数関数
    function f1(x,y){

        let result;

        result = eval(input4.value());

        return -result*board_wid/2;
    }


    //パーツA
    for(let i=1; i<=board_num; i++){

        let pathtmp = [];

        //スリットの両縦線を入れるx座標
        let slit = []; 
        for(let j=1; j<=board_num; j++){
            slit.push(board_wid/(board_num+1)*j-slit_thick/2,board_wid/(board_num+1)*j+slit_thick/2);
        }

        let para0 = 2/(board_num+1)*i - 1;   //２変数関数の片方のパラメータ

        
        //底辺
        pathtmp.push([[board_wid,0],[0,0]]); 


        //左端縦線
        pathtmp.push([[0,f1(-1,para0)],[0,0]]);
        //右端縦線
        pathtmp.push([[board_wid,f1(1,para0)],[0+board_wid,0]]);

        
        //スリット
        for(let i=1; i<=board_num; i++){
            //左縦線
            pathtmp.push([[board_wid/(board_num+1)*i-slit_thick/2,f1(2/(board_num+1)*i-1-slit_thick/board_wid,para0)],[board_wid/(board_num+1)*i-slit_thick/2,(f1(2/(board_num+1)*i-1,para0))/2]]);
            //底辺
            pathtmp.push([[board_wid/(board_num+1)*i-slit_thick/2,(f1(2/(board_num+1)*i-1,para0))/2],[board_wid/(board_num+1)*i+slit_thick/2,(f1(2/(board_num+1)*i-1,para0))/2]]);
            //右縦線
            pathtmp.push([[board_wid/(board_num+1)*i+slit_thick/2,f1(2/(board_num+1)*i-1+slit_thick/board_wid,para0)],[board_wid/(board_num+1)*i+slit_thick/2,(f1(2/(board_num+1)*i-1,para0))/2]]);
        }


        //曲線
        let flag = true;
        let tmp = [];   //パスの一時スタック
        maxhei.push(0);

        for(let i=0; i<=roughness; i++){

            if(flag && board_wid/roughness*i>slit[0]){
                tmp.push([slit[0],f1(slit[0]/board_wid*2-1,para0)]);
                pathtmp.push(tmp);
                slit.shift();
                flag = false;
            }else if(!flag && board_wid/roughness*i>slit[0]){
                tmp = [];
                tmp.push([slit[0],f1(slit[0]/board_wid*2-1,para0)]);
                slit.shift();
                flag = true;
            }else if(flag){
                tmp.push([board_wid/roughness*i, f1(i/roughness*2-1,para0)]);
                if(maxhei[maxhei.length-1] < -f1(i/roughness*2-1,para0))   maxhei[maxhei.length-1] = -f1(i/roughness*2-1,para0);
                if(f1(i-roughness/2,para0)>0)   error = true;      
            }

        }
        pathtmp.push(tmp);


        pathgroup.push(pathtmp);

        

    }
    

    //パーツB
    for(let i=1; i<=board_num; i++){

        let pathtmp = [];

        let para0 = 2/(board_num+1)*i - 1;   //２変数関数の片方のパラメータ
        
        //底辺
        pathtmp.push([[0,0],[board_wid/(board_num+1)-slit_thick/2,0]]);
        pathtmp.push([[board_wid-board_wid/(board_num+1)+slit_thick/2,0],[board_wid,0]]);
        for(let i=1; i<board_num; i++){
            pathtmp.push([[board_wid/(board_num+1)*i+slit_thick/2, 0],[board_wid/(board_num+1)*(i+1)-slit_thick/2, 0]]);
        }


        //左端縦線
        pathtmp.push([[0,f1(para0,-1)],[0,0]]);
        //右端縦線
        pathtmp.push([[board_wid,f1(para0,1)],[board_wid,0]]);

        
        //スリット
        for(let i=1; i<=board_num; i++){
            //左縦線
            pathtmp.push([[board_wid/(board_num+1)*i-slit_thick/2,0],[board_wid/(board_num+1)*i-slit_thick/2,(f1(para0,2/(board_num+1)*i-1))/2]]);
            //底辺
            pathtmp.push([[board_wid/(board_num+1)*i-slit_thick/2,(f1(para0,2/(board_num+1)*i-1))/2],[board_wid/(board_num+1)*i+slit_thick/2,(f1(para0,2/(board_num+1)*i-1))/2]]);
            //右縦線
            pathtmp.push([[board_wid/(board_num+1)*i+slit_thick/2,0],[board_wid/(board_num+1)*i+slit_thick/2,(f1(para0,2/(board_num+1)*i-1))/2]]);
        }

        //曲線
        let tmp = [];   //パスの一時スタック
        maxhei.push(0);
        for(let i=0; i<=roughness; i++){
            tmp.push([board_wid/roughness*i, f1(para0,i/roughness*2-1)]);
            if(maxhei[maxhei.length-1]<-f1(para0,i/roughness*2-1))    maxhei[maxhei.length-1] = -f1(para0,i/roughness*2-1);
            if(f1(para0,i/roughness*2-1)>0) error = true;
        }
        pathtmp.push(tmp);

        pathgroup.push(pathtmp);


    }

    path = JSON.parse(JSON.stringify(pathgroup));

    let dx=0, dy=0;

    for(let i1=0; i1<board_num; i1++){
        dy += maxhei[i1]+5;
        for(let i2=0; i2<path[i1].length; i2++){
            for(let i3=0; i3<path[i1][i2].length; i3++){
                path[i1][i2][i3][1] += dy;
            }
        }
    }

    dx = board_wid + 5;
    dy = 0;

    for(let i1=board_num; i1<board_num*2; i1++){
        dy += maxhei[i1]+10;
        for(let i2=0; i2<path[i1].length; i2++){
            for(let i3=0; i3<path[i1][i2].length; i3++){
                path[i1][i2][i3][0] += dx;
                path[i1][i2][i3][1] += dy;
            }
        }
    }

    path = path.flat(1);

}



//パス（ポイントリスト）からSVGファイルを生成、ダウンロード
function createsvgfile(vtsarray){

    file=createWriter('cutfile.svg');

    let str='';

    str+=
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'+
    '<!-- Created with Inkscape (http://www.inkscape.org/) -->\n'+
    '\n'+
    '<svg\n'+
    '   width="210mm"\n'+
    '   height="297mm"\n'+
    '   viewBox="0 0 210 297"\n'+
    '   version="1.1"\n'+
    '   id="svg5"\n'+
    '   xmlns="http://www.w3.org/2000/svg"\n'+
    '   xmlns:svg="http://www.w3.org/2000/svg">\n'+
    '  <defs\n'+
    '     id="defs2" />\n';

    for(let k=0;k<vtsarray.length;k++){
        str+=
        '  <path\n'+
        '     style="fill:none;stroke:#000000;stroke-width:0.264583"\n'+
        '     d="m';

        for(let i=0;i<vtsarray[k].length;i++){
            let dx,dy;
            if(i==0){
                dx=vtsarray[k][0][0];
                dy=vtsarray[k][0][1];
            }else{
                dx=vtsarray[k][i][0]-vtsarray[k][i-1][0];
                dy=vtsarray[k][i][1]-vtsarray[k][i-1][1];
            }
            str+=' '+dx+','+dy
        }
        str+=
        '"\n';

        str+=
        '     id="path'+k+'" />\n';
    }

    str+='</svg>\n';

    file.write(str);
	file.close();

}