import Button, { ButtonProps } from "@/components/game/input/button";

export default function ButtonRow(props: ButtonRowProps) {
  const buttons = props.buttons.map((button, i) => {
    return <Button key={i} buttonType={button.buttonType}></Button>;
  });

  return (
    <div className="flex flex-wrap gap-2 border-[1px] h-[55px]">{buttons}</div>
  );
}

type ButtonRowProps = { buttons: ButtonProps[] };
