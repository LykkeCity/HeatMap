
type TextAlign = "start" | "end" | "left" | "right" | "center";
type TextBaseline = "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom";

class MyCanvas {
    
    private readonly dpr: number;
    
    public readonly ctx:CanvasRenderingContext2D;
    
    public readonly canvasWidth:number;
    public readonly canvasHeight:number;
    
    constructor(public canvas:HTMLCanvasElement, canvasWidth:number,  canvasHeight:number){

        this.canvasWidth =canvasWidth;
        this.canvasHeight =canvasHeight;
        
        this.dpr = window.devicePixelRatio;
        
        this.ctx = canvas.getContext('2d');
        this.ctx.translate(0.5, 0.5);

        this.canvas.width = canvasWidth * this.dpr;
        this.canvas.height = canvasHeight * this.dpr;
        canvas.setAttribute("style", "width:"+canvasWidth+"px;height:"+canvasHeight+"px");
        this.setWorkingRectAllCanvas();
    }
    
    public mouseX:number;
    public mouseY:number;
    
    clearAll():void{
        this.clearRect(0, 0, this.width, this.height);
    }
    
    clearRect(l,t, w, h:number):void{
        this.ctx.clearRect(this.xOffset+l * this.dpr, this.yOffset+t * this.dpr, w * this.dpr, h * this.dpr);
    }

    public xOffset:number;
    public yOffset:number;
    public width:number;
    public height:number;
    private leftWithDpr:number;
    private topWithDpr:number;
    
    setWorkingRectAllCanvas(){
        this.setWorkingRect(0,0, this.canvasWidth, this.canvasHeight);
    }
    
    setWorkingRect(x:number, y:number, w:number, h:number):void{
        this.xOffset = x;
        this.yOffset = y;
        this.width = w;
        this.height=h;
        this.leftWithDpr = x*this.dpr;
        this.topWithDpr = y*this.dpr;
    }


    beginPath():void{
        this.ctx.beginPath();
    }

    stroke():void{
        this.ctx.stroke();
    }
    
    moveTo(x:number, y:number):void{
        this.ctx.moveTo(this.leftWithDpr+x*this.dpr, this.topWithDpr+y*this.dpr);
    }

    lineTo(x:number, y:number):void{
        this.ctx.lineTo(this.leftWithDpr+x*this.dpr, this.topWithDpr+y*this.dpr);
    }

    closePath():void{
        this.ctx.closePath();
    }

    fill():void{
        this.ctx.fill();
    }

    setStrokeStyle(style:string):void{
        this.ctx.strokeStyle = style;
    }

    setLineWidth(w:number):void{
        this.ctx.lineWidth = w*this.dpr;
    }

    setFillStyle(style:any):void{
        this.ctx.fillStyle = style;
    }

    
    fillText(text:string, x:number, y:number){
        this.ctx.fillText(text, this.leftWithDpr+x*this.dpr,this.topWithDpr+y*this.dpr);
    }
    
    setTextSize(size:number):void{
        this.ctx.font = size*this.dpr+'px Arial';
    }
    
    setTextVerticalAlign(align:TextBaseline){
        this.ctx.textBaseline = align;
    }
    
    setTextHorizontalAlign(align:TextAlign){
        this.ctx.textAlign = align;
        
    }
    
    drawRoundRect(l,t, w, h,r:number, fillColor:string):void{
   //     this.ctx.beginPath();
   //     this.ctx.fillRect(l*this.dpr,t*this.dpr,w*this.dpr,h*this.dpr);
        
        
        l = l*this.dpr;
        t = t*this.dpr;
        w = w*this.dpr;
        h = h*this.dpr;
        r = r*this.dpr;
        
        let rt = l+w;
        let bt = t+h;

        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = r;
        this.ctx.fillStyle = fillColor;

        this.ctx.beginPath();
        
        this.ctx.moveTo(this.leftWithDpr+l,this.topWithDpr+t+r);
        this.ctx.bezierCurveTo(this.leftWithDpr+l, this.topWithDpr+t+r,  this.leftWithDpr+l, this.topWithDpr+t, this.leftWithDpr+l+r,this.topWithDpr+t);

        
        this.ctx.lineTo(this.leftWithDpr+rt-r,this.topWithDpr+t);
        this.ctx.bezierCurveTo(this.leftWithDpr+rt-r, this.topWithDpr+t,  this.leftWithDpr+rt, this.topWithDpr+t, this.leftWithDpr+rt, this.topWithDpr+t+r);
        
        this.ctx.lineTo(this.leftWithDpr+rt,this.topWithDpr+bt-r);
        this.ctx.bezierCurveTo(this.leftWithDpr+rt, this.topWithDpr+bt-r,  this.leftWithDpr+rt, this.topWithDpr+bt, this.leftWithDpr+rt-r,this.topWithDpr+bt);
        
        this.ctx.lineTo(this.leftWithDpr+l+r,this.topWithDpr+bt);
        this.ctx.bezierCurveTo(this.leftWithDpr+l+r, this.topWithDpr+bt,  this.leftWithDpr+l, this.topWithDpr+bt, this.leftWithDpr+l,this.topWithDpr+bt-r);
        
        this.ctx.closePath();

        this.ctx.fill();

    }
    
    setShadow(x,y,blur:number, color:string):void{
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = blur;
        this.ctx.shadowOffsetX = x;
        this.ctx.shadowOffsetY = y;
    }
    
    clearShadow():void{
        this.setShadow(0,0,0, 'transparent');
    }
    
}