'use strict';

var ms;

function move(from, to) {
  var f = document.getElementById(from);
  var t = document.getElementById(to);
  // console.log(f, t);
  f.classList.add('hidden');
  f.classList.remove('visible');
  t.classList.add('visible');
  t.classList.remove('hidden');
}

class minesweeper {
  constructor(width, height, bomb){
    this.width = width;
    this.height = height;
    this.bomb = bomb;
    this.map = []
    this.status = []//0:close, 1:open, 2:flag, 3:ques.
    for(var i=0; i<this.width*this.height; i++){
      this.map.push(0);
      this.status.push(0);
    }
  }
  setBomb(x, y){
    var rest = this.bomb;
    while(rest > 0){
      var pos = Math.floor(Math.random() * this.width*this.height);
      var px = pos%this.width;
      var py = Math.floor(pos/this.width);

      if(Math.abs(x-px) > 1 || Math.abs(y-py) > 1){
        if(this.map[pos] >= 0){
          for(var h=py-1; h <= py+1; h++){
            if(h<0 || h>=this.height) continue;
            for(var w=px-1; w <= px+1; w++){
              if(w<0 || w>=this.width || this.map[this.width*h+w] == -1) continue;
              this.map[this.width*h+w]+=1;
            }
          }
          this.map[pos] = -1;
          rest--;
        }
      }
    }
    // console.log(this.map);
  }

  open_step2(x, y, pos){
    if(this.map[pos] == 0){
      // console.log(x, y, 'is 0');
      for(var h=y-1; h <= y+1; h++){
        if(h<0 || h>=this.height) continue;
        for(var w=x-1; w <= x+1; w++){
          if(w<0 || w>=this.width) continue;
          if(this.status[this.width*h+w] != 0) continue;
          // console.log(w, h, 'will open');
          this.status[this.width*h+w] = 1;
          if(this.map[this.width*h+w] == 0){
            // console.log('find new 0');
            this.open_step2(w, h, this.width*h+w);
          }
        }
      }
    }else{
      this.status[pos] = 1;
    }
  }

  open(x, y){
    var pos = this.width*y+x;
    if(this.status[pos] != 0){
      return -1;
    }else if(this.map[pos] == -1){
      return -2;
    }
    //map[x, y]=0
    this.open_step2(x, y, pos);
    return 0;
  }
}

function init(x, y, b){
  ms = new minesweeper(x, y, b);
  // console.log(ms);
  ms.setBomb(5, 5);
  ms.open(5, 5);
  console.log(ms.map, ms.status);
}
