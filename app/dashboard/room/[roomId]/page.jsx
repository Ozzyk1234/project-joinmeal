const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/rooms/getRoom/${id}`);
  const data = await res.json();
  return data.room;
};

export default async function Room({ params }) {
  const roomId = params.roomId;
  const data = await getData(roomId);
  console.log(data);

  return (
    <>
      <div>Pokoj {data.name} </div>
      <div>max sloty {data.slots} </div>
      <div>uzyte {data.useSlots} </div>
      <div>cena {data.cost} </div>
      <div>Utworzono {data.time} </div>
    </>
  );
}
