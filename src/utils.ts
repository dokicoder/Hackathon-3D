export const getLocationFromBodyPart = (bodyPart?: string, fallBack?: string) =>
  ({
    hand_left: 'Linke Hand',
    hand_right: 'Rechte Hand',
    foot_left: 'Linker Fuss',
    foot_right: 'Rechter Fuss',
    face_front: 'Gesicht',
    arm_left_lower_back: 'Linker Unterarm, Rückseite',
    arm_right_lower_back: 'Rechter Unterarm, Rückseite',
    arm_left_lower_front: 'Linker Unterarm, Vorderseite',
    arm_right_lower_front: 'Rechter Unterarm, Vorderseite',
    body: 'Sonstige',
  }[bodyPart as string] || fallBack);
