export const isStreamOnline = async () => {
    var res = await fetch("http://porus.dev");
    return res.status == 200;
}
export default isStreamOnline;


