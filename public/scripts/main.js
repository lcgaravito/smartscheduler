//alert("Holi");

const blocks = {
  1: "5:00-5:30",
  2: "5:30-6:00",
  3: "6:00-6:30",
  4: "6:30-7:00",
  5: "7:00-7:30",
  6: "7:30-8:00",
  7: "8:00-8:30",
  8: "8:30-9:00",
  9: "9:00-9:30",
  10: "9:30-10:00",
  11: "10:00-10:30",
  12: "10:30-11:00",
  13: "11:00-11:30",
  14: "11:30-12:00",
  15: "12:00-12:30",
  16: "12:30-13:00",
  17: "13:00-13:30",
  18: "13:30-14:00",
  19: "14:00-14:30",
  20: "14:30-15:00",
  21: "15:00-15:30",
  22: "15:30-16:00",
  23: "16:00-16:30",
  24: "16:30-17:00",
  25: "17:00-17:30",
  26: "17:30-18:00",
  27: "18:00-18:30",
  28: "18:30-19:00",
  29: "19:00-19:30",
  30: "19:30-20:00",
  31: "20:00-20:30",
  32: "20:30-21:00",
  33: "21:00-21:30",
  34: "21:30-22:00"
};

const JSON = [
  {
    name: "Juan Pablo",
    schedule: {
      M: [10, 11, 12, 25, 26, 27],
      T: [9, 10, 11, 12, 16, 17, 18, 19, 20, 25, 26, 27, 28, 29, 30]
    }
  },
  {
    name: "Juan Sebastian",
    schedule: { M: [12, 13, 14, 15, 27, 28, 29, 30], T: [6, 7, 8, 9, 10, 11] }
  }
];

const findSchedule = list => {
  const result = blocks;

  list.forEach(user => {
    console.log("\nEntró un usuario nuevo:", user.name, user.schedule); // Imprime el usuario y su horario
    const sch = user.schedule;

    // Para monday
    sch.M.forEach(block => {
      console.log("Monday. Se va a sacar el bloque No. ", block);
      //sch.split(block) NO SÉ CÓMO SE HACE ESTA ELIMINACIÓN
    });
    // Para tuesday
    sch.T.forEach(block => {
      console.log("Tuesday. Se va a sacar el bloque No. ", block);
      //sch.split(block) NO SÉ CÓMO SE HACE ESTA ELIMINACIÓN
    });
  });
};

const main = () => {
  findSchedule(JSON);
};

function updateStartHour( ) {
  const selected_option = $('#controlSelectS').val()[0];
  console.log( "Seleccionó la start hour: ", selected_option );
  alert("Hora de inicio: " + selected_option);
}

function updateEndHour( ) {
  const selected_option = $('#controlSelectE').val()[0];
  console.log( "Seleccionó la end hour: ", selected_option );
  alert("Hora de fin: " + selected_option);
}

function updateDay( ) {
  const selected_option = $('#controlSelectDay').val()[0];
  console.log( "Seleccionó el día: ", selected_option );
  alert("Día: " + selected_option);
}