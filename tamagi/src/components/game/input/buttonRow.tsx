import Button, { ButtonProps } from "@/components/game/input/button";

export default function ButtonRow(props: ButtonRowProps) {
  const buttons = props.buttons.map((button, i) => {
    return (
      <Button
        key={i}
        buttonText={button.buttonText}
        buttonType={button.buttonType}
      ></Button>
    );
  });

  return <div className="flex flex-row flex-wrap gap-2">{buttons}</div>;
}

type ButtonRowProps = { buttons: ButtonProps[] };
