export type Zone = {
  id: string;
  label: string;
  desc?: string;
  href: `https://${string}`;
  color?: string; // accent cho halo/khối
};

export const ZONES: Zone[] = [
  { id:"ovbay",   label:"OVBAY",   desc:"Mua bán & đấu giá",            href:"https://ovbay.com/?utm_source=ovplaza",   color:"#f59e0b" },
  { id:"ovtutor", label:"OVTUTOR", desc:"Khoá học & mentor 1:1",        href:"https://ovtutor.com/?utm_source=ovplaza", color:"#3b82f6" },
  { id:"ovvideo", label:"OVVIDEO", desc:"Video học liệu, playlist",      href:"https://ovvideo.com/?utm_source=ovplaza", color:"#f43f5e" },
  { id:"ovcafe",  label:"OVCAFE",  desc:"Cộng đồng & livestream",        href:"https://ovcafe.com/?utm_source=ovplaza",  color:"#8b5cf6" },
  { id:"ovlab",   label:"OVLAB",   desc:"Phòng lab/R&D, thử nghiệm",     href:"https://ovlab.com/?utm_source=ovplaza",   color:"#10b981" },
];
