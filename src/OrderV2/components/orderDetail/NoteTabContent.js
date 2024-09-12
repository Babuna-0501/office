import { useState } from 'react';
import { NoteOrderDetail } from '../note';

function NoteTabContent({ data, userData }) {
  const [foo, setFoo] = useState();

  return (
    <NoteOrderDetail
      note={foo}
      setFoo={setFoo}
      id={data.order_id}
      userData={userData}
    />
  );
}

export default NoteTabContent;
