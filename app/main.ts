import { createInterface } from "readline";

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
  }else if(command.sartsWith("type")){
    const name = command.slice(5)     ;
    if(builtins.includes(name)){
      console.log(`${command} is a shell builtin`);
    }   
  }
  else
    {console.log(`${command}: command not found`);}
  rl.prompt();
});