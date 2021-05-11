import uniqId from "uniqid";

export const categoryNames = {
  BRONZE: "Bronze",
  SILVER: "Silver",
  GOLD: "Gold",
  PLATINUM: "Platinum",
  WHEEL_CHAIR: "wheelchair",
};

export const categories = [
  {
    id: uniqId(),
    title: categoryNames.BRONZE,
    color: "#cd7f32",
    isEditable: false,
    isActive: false,
    isWheelchair: false,
  },
  {
    id: uniqId(),
    title: categoryNames.SILVER,
    color: "#C0C0C0",
    isEditable: false,
    isActive: false,
    isWheelchair: false,
  },
  {
    id: uniqId(),
    title: categoryNames.GOLD,
    color: "#FFD700",
    isEditable: false,
    isActive: false,
    isWheelchair: false,
  },
  {
    id: uniqId(),
    title: categoryNames.PLATINUM,
    color: "#E5E4E2",
    isEditable: false,
    isActive: false,
    isWheelchair: false,
  },
  {
    id: uniqId(),
    title: categoryNames.WHEEL_CHAIR,
    color: "pink",
    isEditable: false,
    isActive: false,
    isWheelchair: true,
  },
];
