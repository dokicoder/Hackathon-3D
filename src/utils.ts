export const getLocationFromBodyPart = (bodyPart?: string, fallBack?: string) =>
  ({
    hand_left: 'Linke Hand',
    hand_right: 'Rechte Hand',
    foot_left: 'Linker Fuss',
    foot_right: 'Rechter Fuss',
    face_front: 'Gesicht',
    body: 'Sonstige',
  }[bodyPart as string] || fallBack);
