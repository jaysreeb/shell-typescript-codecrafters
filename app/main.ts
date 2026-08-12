import { createInterface } from "readline";
import path from "path";
import fs from "fs";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

const builtins=["echo", "exit", "type"];
rl.prompt();
rl.on('line', (command) => {
  if(command === "exit"){
    rl.close();
    return;
  }else if(command.startsWith("echo")){
    console.log(command.slice(5));
  }else if(command.startsWith("type")){
    const name = command.slice(5);

    if(builtins.includes(name)){
      console.log(`${name} is a shell builtin`);
    }
    // Check if its executable file
    else{
      const paths = process.env.PATH.split(path.delimiter);
      for(const dir of paths){
        const filePath = path.join(dir, name);
        try{
          fs.accessSync(filePath, fs.constants.X_OK);
          console.log(`${name} is ${filePath}`);
          break;
        }catch{
          
        }
      }

    }  
  }
  else
    {
      console.log(`${command}: not found`);
    }
  rl.prompt();
});