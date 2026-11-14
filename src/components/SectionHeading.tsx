import { Lotus } from './Ornaments';

type Props = { numeral?: string; eyebrow?: string; title: string; id?: string; light?: boolean };

export default function SectionHeading({ numeral, eyebrow, title, id, light }: Props) {
  return (
    <div className={`section-heading ${light ? 'section-heading--light' : ''}`} data-reveal>
      <Lotus className="section-heading__lotus" />
      {(numeral || eyebrow) && (
        <p className="section-heading__eyebrow">
          {numeral && <span className="section-heading__numeral">{numeral}</span>}
          {eyebrow}
        </p>
      )}
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
    </div>
  );
}
