//スリットフォームの設計図（svgファイル）を出力する

//入力　2変数関数　

let path = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
    noLoop();
}

function draw(){
    background(255);


    let x0 = 50;
    let y0 = 50;

    let wid = 100;
    let hei = 30;

    let thick = 0.45;
    let m = 12;
    let tmp;

    /*
    path.push([[x0+wid,y0],[x0+wid,y0+hei]]);
    path.push([[x0,y0+hei],[x0,y0]]);

    path.push([[x0,y0],[x0+wid/(m+1)-thick/2,y0]]);
    path.push([[x0+wid-wid/(m+1)+thick/2,y0],[x0+wid,y0]]);
    for(let i=1; i<m; i++){
        path.push([[x0+wid/(m+1)*i+thick/2,y0],[x0+wid/(m+1)*(i+1)-thick/2,y0]]);
    }

    for(let i=1; i<=m; i++){
        path.push([[x0+wid/(m+1)*i-thick/2,y0],[x0+wid/(m+1)*i-thick/2,y0+hei/2]]);
        path.push([[x0+wid/(m+1)*i-thick/2,y0+hei/2],[x0+wid/(m+1)*i+thick/2,y0+hei/2]]);
        path.push([[x0+wid/(m+1)*i+thick/2,y0+hei/2],[x0+wid/(m+1)*i+thick/2,y0]]);
    }
    */

    let slit;

    for(let i=1; i<=1; i++){

        slit = [];
        for(let j=1; j<=m; j++){
            slit.push(wid/(m+1)*j-thick/2,wid/(m+1)*j+thick/2);
        }

        y0 += 60;

        let x1,y1;

        y1 = 100/7*i-50, x1 = 100/7*i-50;

        path.push([[x0+wid,y0+hei],[x0,y0+hei]]);
        
        
        let m2 = 100;
        tmp = [];

        let flag = true;

        for(let i=0; i<=m2; i++){

            if(flag && wid/m2*i>slit[0]){
                tmp.push([x0+slit[0],y0+f1(slit[0]/wid*m2-m2/2,y1)]);
                path.push(tmp);
                slit.shift();
                flag = false;
            }else if(!flag && wid/m2*i>slit[0]){
                tmp = [];
                tmp.push([x0+slit[0],y0+f1(slit[0]/wid*m2-m2/2,y1)]);
                slit.shift();
                flag = true;
            }else if(flag){
                tmp.push([x0+wid/m2*i, y0+f1(i-m2/2,y1)]);
            }
        }
        path.push(tmp);

        path.push([[x0,y0+f1(m2/(m+1)*0-m2/2,y1)],[x0,y0+hei]]);
        path.push([[x0+wid,y0+f1(m2/(m+1)*(m+1)-m2/2,y1)],[x0+wid,y0+hei]]);

        for(let i=1; i<=m; i++){
            path.push([[x0+wid/(m+1)*i-thick/2,y0+f1(m2/(m+1)*i-m2/2,y1)],[x0+wid/(m+1)*i-thick/2,y0+(hei+f1(m2/(m+1)*i-m2/2,y1))/2]]);
            path.push([[x0+wid/(m+1)*i-thick/2,y0+(hei+f1(m2/(m+1)*i-m2/2,y1))/2],[x0+wid/(m+1)*i+thick/2,y0+(hei+f1(m2/(m+1)*i-m2/2,y1))/2]]);
            path.push([[x0+wid/(m+1)*i+thick/2,y0+f1(m2/(m+1)*i-m2/2,y1)],[x0+wid/(m+1)*i+thick/2,y0+(hei+f1(m2/(m+1)*i-m2/2,y1))/2]]);
        }

        
        /*
        let dx = 100;
        tmp = [];

        //path.push([[x0+wid+dx,y0+hei],[x0+dx,y0+hei]]);
    
        path.push([[x0+dx,y0+hei],[x0+wid/(m+1)-thick/2+dx,y0+hei]]);
        path.push([[x0+wid-wid/(m+1)+thick/2+dx,y0+hei],[x0+wid+dx,y0+hei]]);
        for(let i=1; i<m; i++){
            path.push([[x0+wid/(m+1)*i+thick/2+dx,y0+hei],[x0+wid/(m+1)*(i+1)-thick/2+dx,y0+hei]]);
        }

        for(let i=0; i<=m2; i++){
        tmp.push([x0+wid/m2*i+dx, y0+f1(x1,i-m2/2)]);
        }
        path.push(tmp);

        path.push([[x0+dx,y0+f1(x1,m2/(m+1)*0-m2/2)],[x0+dx,y0+hei]]);
        path.push([[x0+wid+dx,y0+f1(x1,m2/(m+1)*(m+1)-m2/2)],[x0+wid+dx,y0+hei]]);

        for(let i=1; i<=m; i++){
            path.push([[x0+wid/(m+1)*i-thick/2+dx,y0+hei],[x0+wid/(m+1)*i-thick/2+dx,y0+(hei+f1(x1,m2/(m+1)*i-m2/2))/2]]);
            path.push([[x0+wid/(m+1)*i-thick/2+dx,y0+(hei+f1(x1,m2/(m+1)*i-m2/2))/2],[x0+wid/(m+1)*i+thick/2+dx,y0+(hei+f1(x1,m2/(m+1)*i-m2/2))/2]]);
            path.push([[x0+wid/(m+1)*i+thick/2+dx,y0+hei],[x0+wid/(m+1)*i+thick/2+dx,y0+(hei+f1(x1,m2/(m+1)*i-m2/2))/2]]);
        }
        */

    }
    


    stroke(0);
    let sc = 4;
    for(let i=0; i<path.length; i++)    for(let j=0; j<path[i].length-1; j++){
        line(path[i][j][0]*sc, path[i][j][1]*sc, path[i][j+1][0]*sc, path[i][j+1][1]*sc);
    }

}

function f1(x,y){
    return 1;
    return x*y*0.013;
    return (x*x-y*y)*0.008;
    return (x+y)*0.3;
}

function keyPressed(){
    if(keyCode == ENTER){
        createsvgfile(path);
    }
}

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

	console.log(file);
}