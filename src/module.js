console.log('module');

async function start() {
  await Promise.resolve('async!!');
}

start().then(console.log('gogogo'));
