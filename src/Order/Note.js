import { useEffect } from "react";

function Note(note) {
	// console.log("notes-------111111111---notes", note);
	let notes = null;
	try {
		notes = note.note ? JSON.parse(note.note) : null;
		// if (notes) {
		//   notes = notes.filter((x) => x.by !== "system");
		// }

		// notes = notes.sort(function (a, b) {
		// 	var c = new Date(a.CreatedDate);
		// 	var d = new Date(b.CreatedDate);
		// 	return d - c;
		// });
	} catch (e) {
		console.log("error json parse", e);
	}

	// let noteDate =
	//   notes && notes[notes.length - 1]?.date
	//     ? notes[notes.length - 1]?.date.substr(0, 10)
	//     : "";

	let noteDate = notes && notes[0]?.date ? notes[0]?.date.substr(0, 10) : "";

	// useEffect(() => {});

	return notes && notes.length > 0 ? (
		<p className="note">
			{/* {notes[notes.length - 1].body + " (" + noteDate + ")"} */}
			{notes[0].body + " (" + noteDate + ")"}
		</p>
	) : null;
}

export default Note;
