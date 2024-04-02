import { useEffect, useState } from "react";
import css from "./notetab.module.css";
import myHeaders from "../../../components/MyHeader/myHeader";

export const NoteTab = props => {
	let notes = props.note
		? typeof props.note === "string"
			? JSON.parse(props.note)
			: props.note
		: [];
	notes = notes.sort(function (a, b) {
		var c = new Date(a.date);
		var d = new Date(b.date);
		return d - c;
	});
	console.log("PROPS NOTE", notes);
	let copynotes = notes.map(item => {
		if (Array.isArray(item.body)) {
			item.body = item.body[0].body;
		}
	});

	const [orderNotes, setOrderNotes] = useState(
		notes && notes.length > 0 ? notes : []
	);
	const [saving, setSaving] = useState(false);

	const save = () => {
		const foobar = document.getElementById("noteinput");
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
				by: props.userData.email,
			});

			let desc = foobar.value.toString();

			desc = desc
				.trim()
				.replace(/"([^"]+(?="))"/g, "$1")
				.replace("/", "");
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

			fetch("https://api2.ebazaar.mn/api/order/update_note", requestOptions)
				.then(response => response.text())
				.then(result => {
					if (props.aaabbb) {
						let aa = props.aaabbb;
						console.log("aabb", aa);
						aa.description = [notes];
						props.setAaabbb(aa);
					}
					setOrderNotes(notes);
					props.setFoo(notes);
					setSaving(false);
					document.getElementById("note" + props.id).innerText = foobar.value;
					foobar.value = "";
				});
		} else {
			alert("Тэмдэглэл хоосон байна");
		}
	};

	return (
		<div className={css.container}>
			<div className={css.headerContainer}>
				<h1>Тэмдэглэл</h1>
			</div>

			<div className={css.bodyContainer}>
				{orderNotes.map((n, index) => {
					return (
						<p className="bar" key={index} style={{ fontSize: 14 }}>
							{n.date
								? n.date.substr(0, 16) +
								  " " +
								  n.body +
								  (n.by ? "----" + n.by : "")
								: n.body}
						</p>
					);
				})}
			</div>

			<div className={css.inputContainer}>
				<input
					type="text"
					placeholder="Тэмдэглэлээ энд бичнэ үү"
					id="noteinput"
				/>
			</div>

			<div className={css.btnContainer}>
				<button onClick={() => save()}>
					{saving ? "Түр хүлээнэ үү" : "Хадгалах"}
				</button>
			</div>
		</div>
	);
};
