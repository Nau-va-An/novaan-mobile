import type Post from "../types/Post";

const getNextPost = (): Post =>
    ({
        id: "1",
        title: "Cách làm bánh kem (bánh gato) dâu tây tại nhà",
        description:
            "Bánh kem thường xuất hiện trong những bữa tiệc sinh nhật hay những ngày vui trong các gia đình và hội bạn thân nên được rất nhiều người yêu thích. Hôm nay Điện máy XANH sẽ vào bếp góp vào niềm vui của mọi người bằng món bánh kem (bánh gato) dâu tây thơm ngon nhé!",
        video: "//cdn-cf-east.streamable.com/video/mp4/y07xxp.mp4?Expires=1688410860&Signature=CaQoDQupyoEuB0rI8WJSCAqFXx950IwCPDQkaK~fM2C18liHRNWwIK9gEDHGfnvxVy--61S1atVGyzeg6ECKHKDTtqdT8ZOdq~ueABT49~eZQ~oXWx-PpuDbRmvARImL7g1LQgf7NdG2lik-HQfDXv4R4G1QPhp6qOYK8JFqbbxBXL9KHJkY6S9ePuG0zcxxznAqrPBFn3buzE4jFeFnWDw7BBlLlfXfL04~ZK42h3zJt162yTSTCyDq4IaCfxOODRVt6YJdGA5U0Aoc99XoisOW86a846MTCMeR8XZ0yPwHE~Djnk128524FApMoSO5z1Wdbxsm6VW03NwJgJIWsQ__&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ",
        type: "recipe",
        difficulty: 1,
        portionQuantity: 1,
        portionType: 1,
        prepTime: { hour: 0, minute: 30 },
        cookTime: { hour: 0, minute: 30 },
        instructions: [
            {
                step: 1,
                description:
                    "Sơ chế dâu tây: Dâu tây ngâm với nước muối loãng khoảng vài phút sau đó rửa sạch, để ráo và cắt đôi, bỏ cuống.",
            },
            {
                step: 2,
                description:
                    "Dâu tây sau khi đã sơ chế, bạn chừa lại khoảng 4 trái để trang trí, phần còn lại thì bạn trộn cùng 100gr đường để khoảng 30 phút rồi mang đi nấu. Nấu dâu tây trên lửa vừa đến khi dâu tây mềm nhũn. Sau đó bạn đem lọc qua rây, dùng thìa miết nhuyễn dâu và lọc bỏ phần bã. Đem bọc kín mứt và để ngăn mát tủ lạnh.",
            },
        ],
        ingredients: [
            {
                name: "bột mì đa dụng",
                amount: 110,
                unit: "gram",
            },
            {
                name: "tinh bột bắp",
                amount: 30,
                unit: "gram",
            },
        ],
        creator: {
            username: "Điện máy XANH",
            userId: "123332",
        },
    } as any);

const reelServices = {
    getNextPost,
};

export default reelServices;
