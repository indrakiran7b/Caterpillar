import { RecyclableIllustration } from "@/components/hero/illustrations";
import { defaultMaterialId, type MaterialConfig, type MaterialPiece } from "@/data/materials";

type MaterialIllustrationProps = {
  material: MaterialConfig;
};

function Piece({ piece }: { piece: MaterialPiece }) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 ${piece.width}`}
      style={{
        zIndex: Math.round(piece.depth * 10),
        transform: `translate(calc(-50% + ${piece.x}%), calc(-50% + ${piece.y}%)) rotate(${piece.rotate}deg)`,
      }}
    >
      <div data-material-piece data-depth={piece.depth}>
        <div className="[filter:drop-shadow(8px_14px_0_rgba(20,18,15,0.08))]">
          <RecyclableIllustration type={piece.type} className="h-auto w-full" />
        </div>
      </div>
    </div>
  );
}

export function MaterialIllustration({ material }: MaterialIllustrationProps) {
  const mobilePieces = material.piecesMobile ?? material.pieces;

  return (
    <div
      data-material-scene={material.id}
      data-active={material.id === defaultMaterialId ? "true" : "false"}
      className={`absolute inset-0 ${
        material.id === defaultMaterialId ? "" : "invisible"
      }`}
    >
      <div className="absolute inset-0 md:hidden">
        {mobilePieces.map((piece, index) => (
          <Piece key={`${material.id}-m-${piece.type}-${index}`} piece={piece} />
        ))}
      </div>
      <div className="absolute inset-0 hidden md:block">
        {material.pieces.map((piece, index) => (
          <Piece key={`${material.id}-d-${piece.type}-${index}`} piece={piece} />
        ))}
      </div>
    </div>
  );
}
