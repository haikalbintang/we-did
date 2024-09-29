const status = {
  newEntry: "newEntry",
  progress: "progress",
  withNote: "note",
  done: "done",
};

export const navLinks = [
  { name: "past" },
  { name: "present" },
  { name: "future" },
];

export const pastDataSeed = [
  {
    title: "Belajar React",
    subtitle: "from Jonas' course on Udemy",
    descriptions: ["Supabase", "React Query"],
    status: status.progress,
  },
  {
    title: "Kerjain Project Pribadi",
    subtitle: "this exactly project",
    descriptions: ["Static design first"],
    status: status.progress,
  },
  {
    title: "Belajar Nahwu-Shorof",
    subtitle: "ga cuma saat les Bang Andri",
    descriptions: [
      "Tambah kosa kata arab-indo",
      "shorof",
      "perlancar nahwu",
      "hapalin Al-Fajr",
    ],
    status: status.progress,
  },
  {
    title: "Belajar DSA",
    subtitle: "from Udemy, Python",
    descriptions: ["Singly Linked List ✅", "Stack"],
    status: status.progress,
  },
  {
    title: "Isi Form Next Extension Program",
    subtitle: "baca docs nya dulu",
    descriptions: [
      "https://drive.google.com/file/d/1x-DRdVe1UzH0lHYvMzLq1rR8NVRaZ2kT/view List ✅",
      "https://airtable.com/appqoBLR8M8tPrnYD/shrUDGZ26TE0FbPkI?prefill_Student%20Name%20%28Form%20View%29=M.%20Haikal%20Bintang",
    ],
    status: status.done,
  },
  {
    title: "",
    subtitle: "baca docs nya dulu",
    descriptions: [
      "https://drive.google.com/file/d/1x-DRdVe1UzH0lHYvMzLq1rR8NVRaZ2kT/view List ✅",
      "https://airtable.com/appqoBLR8M8tPrnYD/shrUDGZ26TE0FbPkI?prefill_Student%20Name%20%28Form%20View%29=M.%20Haikal%20Bintang",
    ],
    status: status.done,
  },
  // {
  //   title: "Berenang",
  //   subtitle: "50 m",
  //   description: "di Gema Pesona",
  //   status: status.done,
  // },
  // {
  //   title: "Belanja",
  //   subtitle: "50 m",
  //   description: "di Gema Pesona",
  //   status: status.done,
  // },
  // {
  //   title: "Belajar",
  //   subtitle: "50 m",
  //   description: "di Gema Pesona",
  //   status: status.done,
  // },
  // {
  //   title: "Nyetir",
  //   subtitle: "50 m",
  //   description: "di Gema Pesona",
  //   status: status.done,
  // },
];

export const presentDataSeed = [
  {
    title: "Ngoding",
    subtitle: "50 m",
    description: "di Gema Pesona",
    status: status.done,
  },
];

export const futureDataSeed = [
  {
    title: "Piknik",
    subtitle: "50 m",
    description: "di Gema Pesona",
    status: status.done,
  },
];
