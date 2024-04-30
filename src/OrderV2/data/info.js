const Channel = [
  {
    business_type_id: 0,
    business_type_name: "Бүгд",
    // channel_id: 1,
    // channel_name: "Хүнсний дэлгүүр",
  },
  {
    business_type_id: 1,
    business_type_name: "8 нэрийн дэлгүүр",
    channel_id: 1,
    channel_name: "Хүнсний дэлгүүр",
  },
  {
    business_type_id: 2,
    business_type_name: "6 нэрийн дэлгүүр",
    channel_id: 1,
    channel_name: "Хүнсний дэлгүүр",
  },
  {
    business_type_id: 3,
    business_type_name: "ТҮЦ",
    channel_id: 1,
    channel_name: "Хүнсний дэлгүүр",
  },
  {
    business_type_id: 4,
    business_type_name: "Лангуу, Павильон",
    channel_id: 2,
    channel_name: "Зах бөөний төв",
  },
  {
    business_type_id: 5,
    business_type_name: "Бөөний төв",
    channel_id: 2,
    channel_name: "Зах бөөний төв",
  },
  {
    business_type_id: 23,
    business_type_name: "Агуулах худалдаа",
    channel_id: 2,
    channel_name: "Зах бөөний төв",
  },
  {
    business_type_id: 24,
    business_type_name: "Сүлжээ дэлгүүр",
    channel_id: 2,
    channel_name: "Зах бөөний төв",
  },
  {
    business_type_id: 25,
    business_type_name: "Сүлжээ дэлгүүр-Номин",
    channel_id: 2,
    channel_name: "Зах бөөний төв",
  },
  {
    business_type_id: 6,
    business_type_name: "Ресторан",
    channel_id: 3,
    channel_name: "ХоРеКа",
  },
  {
    business_type_id: 7,
    business_type_name: "Цайны газар",
    channel_id: 3,
    channel_name: "ХоРеКа",
  },
  {
    business_type_id: 8,
    business_type_name: "Зоогийн газар",
    channel_id: 3,
    channel_name: "ХоРеКа",
  },
  {
    business_type_id: 9,
    business_type_name: "Олон үндэстний хоол",
    channel_id: 3,
    channel_name: "ХоРеКа",
  },
  {
    business_type_id: 10,
    business_type_name: "Кафе, Кофе шоп",
    channel_id: 3,
    channel_name: "ХоРеКа",
  },
  {
    business_type_id: 11,
    business_type_name: "Паб, Лаунж",
    channel_id: 3,
    channel_name: "ХоРеКа",
  },
  {
    business_type_id: 12,
    business_type_name: "Караоке",
    channel_id: 3,
    channel_name: "ХоРеКа",
  },
  {
    business_type_id: 13,
    business_type_name: "Зочид буудал",
    channel_id: 3,
    channel_name: "ХоРеКа",
  },
  {
    business_type_id: 14,
    business_type_name: "Бар",
    channel_id: 3,
    channel_name: "ХоРеКа",
  },
  {
    business_type_id: 15,
    business_type_name: "Үсчин, гоо сайхан",
    channel_id: 4,
    channel_name: "Албан Байгууллага",
  },
  {
    business_type_id: 16,
    business_type_name: "Цэцэрлэг",
    channel_id: 4,
    channel_name: "Албан Байгууллага",
  },
  {
    business_type_id: 17,
    business_type_name: "Сургууль",
    channel_id: 4,
    channel_name: "Албан Байгууллага",
  },
  {
    business_type_id: 18,
    business_type_name: "Фитнес",
    channel_id: 4,
    channel_name: "Албан Байгууллага",
  },
  {
    business_type_id: 19,
    business_type_name: "Эмнэлэг",
    channel_id: 4,
    channel_name: "Албан Байгууллага",
  },
  {
    business_type_id: 20,
    business_type_name: "Үйлдвэр",
    channel_id: 4,
    channel_name: "Албан Байгууллага",
  },
  {
    business_type_id: 22,
    business_type_name: "Оффис",
    channel_id: 4,
    channel_name: "Албан Байгууллага",
  },
  {
    business_type_id: 21,
    business_type_name: "Эмийн сан",
    channel_id: 5,
    channel_name: "Эмийн Сан",
  },
  {
    business_type_id: 27,
    business_type_name: "Эцсийн хэрэглэгч",
    channel_id: 6,
    channel_name: "Эцсийн хэрэглэгч",
  },
];
console.log("Channel Data:", Channel);

export function getDates(value) {
  const today = new Date();
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const threeDays = new Date(new Date().setDate(new Date().getDate() - 3));
  const sevenDays = new Date(new Date().setDate(new Date().getDate() - 7));
  const oneMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));

  switch (value) {
    case "yesterday+today":
      return {
        startDate: `${yesterday.getFullYear()}-${
          yesterday.getMonth() + 1
        }-${yesterday.getDate()}`,
        endDate: `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`,
      };
    case "today":
      return {
        startDate: `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`,
        endDate: `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`,
      };
    case "yesterday":
      return {
        startDate: `${yesterday.getFullYear()}-${
          yesterday.getMonth() + 1
        }-${yesterday.getDate()}`,
        endDate: `${yesterday.getFullYear()}-${
          yesterday.getMonth() + 1
        }-${yesterday.getDate()}`,
      };
    case "last3days":
      return {
        startDate: `${threeDays.getFullYear()}-${
          threeDays.getMonth() + 1
        }-${threeDays.getDate()}`,
        endDate: `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`,
      };
    case "lastweek":
      return {
        startDate: `${sevenDays.getFullYear()}-${
          sevenDays.getMonth() + 1
        }-${sevenDays.getDate()}`,
        endDate: `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`,
      };
    case "lastmonth":
      return {
        startDate: `${oneMonth.getFullYear()}-${
          oneMonth.getMonth() + 1
        }-${oneMonth.getDate()}`,
        endDate: `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`,
      };
    default:
      return;
    // case "today":
    //   return {
    //     startDate: `${today.getFullYear()}-${
    //       today.getMonth() + 1
    //     }-${today.getDate()}`,
    //     endDate: `${today.getFullYear()}-${
    //       today.getMonth() + 1
    //     }-${today.getDate()}`,
    //   };
  }
}

export default Channel;
