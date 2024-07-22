import TextFieldPlain from 'src/components/common/TextFieldPlain';

export default function EditPostText({
  text,
  onChange,
}: {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <TextFieldPlain value={text} fullWidth focused multiline minRows={1} onChange={onChange} />
  );
}
