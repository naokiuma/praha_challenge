const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export class DatabaseMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //public save(_: number[]): void {
  public save(num: number[]): void {
    // memo: 課題のために、あえて時々saveが失敗するようにしているが、これだとテストの質がみたされないので
    //if (getRandomInt(10) < 2) {

    let result  = num.filter(element => element < 1);
    if(result.length > 0){//1より小さい数字が入ればエラーにする
        throw new Error("fail!");
      }
      

    }
}

