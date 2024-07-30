import { useState } from 'react';
import myHeaders from '../../components/MyHeader/myHeader';

export const NoteOrderDetail = props => {
  let notes = props.note
    ? typeof props.note === 'string'
      ? JSON.parse(props.note)
      : props.note
    : [];
  const [orderNotes, setOrderNotes] = useState(
    notes && notes.length > 0 ? notes : []
  );
  const [saving, setSaving] = useState(false);

  const save = () => {
    const foobar = document.getElementById('noteinput');
    if (foobar.value !== '' && saving === false) {
      setSaving(true);
      let d = new Date();
      notes.push({
        date:
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1) +
          '-' +
          d.getDate() +
          ' ' +
          d.getHours() +
          ':' +
          d.getMinutes(),
        body: foobar.value.trim(),
        by: props.userData.email
      });

      let desc = foobar.value.toString();

      desc = desc
        .trim()
        .replace(/"([^"]+(?="))"/g, '$1')
        .replace('/', '');
      var raw = JSON.stringify({
        order_id: props.id,
        order_note: desc
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log(requestOptions);
      fetch(
        `${process.env.REACT_APP_API_URL2}/api/order/update_note`,
        requestOptions
      )
        .then(response => response.text())
        .then(result => {
          window.location.reload();
          setOrderNotes(notes);
          props.setFoo(notes);
          setSaving(false);
          document.getElementById('note' + props.id).innerText = foobar.value;
          foobar.value = '';
        });
    } else {
      alert('Тэмдэглэл хоосон байна');
    }
  };
  return (
    <div>
      <div>
        <h1>Тэмдэглэл</h1>
      </div>

      <div>
        {orderNotes.map((n, index) => {
          return (
            <p className='bar' key={index} style={{ fontSize: 14 }}>
              {n.date
                ? n.date.substr(0, 16) +
                  ' ' +
                  n.body +
                  (n.by ? '----' + n.by : '')
                : n.body}
            </p>
          );
        })}
      </div>

      <div>
        <input
          type='text'
          placeholder='Тэмдэглэлээ энд бичнэ үү'
          id='noteinput'
        />
      </div>

      <div>
        <button onClick={() => save()}>
          {saving ? 'Түр хүлээнэ үү' : 'Хадгалах'}
        </button>
      </div>
    </div>
  );
};
