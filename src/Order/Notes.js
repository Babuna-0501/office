import React, { useState, useEffect, useContext } from "react";
import myHeaders from "../components/MyHeader/myHeader";

function Notes(props) {
  console.log("notes props++++", props);
  let notes = props.note
    ? typeof props.note === "string"
      ? JSON.parse(props.note)
      : props.note
    : [];

  let copynotes = notes.map((item) => {
    // console.log("item", item);
    if (Array.isArray(item.body)) {
      item.body = item.body[0].body;
    }
  });

  // console.log("notes------------------", copynotes);
  let [blah, setBlah] = useState(notes && notes.length > 0 ? notes : []);
  // console.log("blah", blah);
  let [saving, setSaving] = useState(false);
  const save = () => {
    const foobar = document.getElementById("noteinput");
    // console.log(foobar.value);
    if (foobar.value !== "" && saving === false) {
      setSaving(true);
      let d = new Date();
      notes.push({
        date:
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getDate() +
          " " +
          d.getHours() +
          ":" +
          d.getMinutes(),
        body: foobar.value.trim(),
        // .replace(/"([^"]+(?="))"/g, "$1")
        // .replace("/", ""),
        by: props.userData.email,
      });
      // console.log(notes);

      let desc = foobar.value.toString();

      desc = desc
        .trim()
        .replace(/"([^"]+(?="))"/g, "$1")
        .replace("/", "");
      console.log("requestOptions", desc);
      var raw = JSON.stringify({
        order_id: props.id,
        order_note: desc,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      console.log("requestOptions", requestOptions);
      fetch("https://api2.ebazaar.mn/api/order/update_note", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          //props.getOrders()

          const createdDate = new Date();
          if (props.aaabbb) {
            let aa = props.aaabbb;
            console.log("aabb", aa);
            aa.description = [notes];
            props.setAaabbb(aa);
          }
          setBlah(notes);
          props.setFoo(notes);
          setSaving(false);
          document.getElementById("note" + props.id).innerText = foobar.value;
        });
    } else {
      alert("Тэмдэглэл хоосон байна");
    }
  };
  return (
    <div id="bg" style={{ zIndex: "150" }}>
      <div id="foo">
        <span className="close" onClick={() => props.setNotes(false)}>
          Close
        </span>
        <h1>Тэмдэглэл</h1>
        <input type="text" placeholder="Тэмдэглэлээ энд бичнэ үү" id="noteinput" />
        <button onClick={() => save()}>{saving ? "Түр хүлээнэ " : "Хадгалах"}</button>
        {blah.map((n, index) => {
          return (
            <p className="bar" key={index}>
              {n.date ? n.date.substr(0, 16) + " " + n.body + (n.by ? "----" + n.by : "") : n.body}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Notes;
