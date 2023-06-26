import Button from "@/components/game/input/button";
import ButtonRow from "@/components/game/input/buttonRow";
export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <div>OK</div>
      <Button buttonText="test"></Button>
      <Button buttonText="test" buttonType="SUCCESS"></Button>
      <Button buttonText="test" buttonType="DANGER"></Button>
      <ButtonRow
        buttons={[{ buttonText: "test" }, { buttonText: "test2" }]}
      ></ButtonRow>
    </div>
  );
}
