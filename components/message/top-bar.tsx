import prisma from '@/lib/prisma'

interface TopBarProps {
    uniqueKeyId: string;
}

export async function TopBar({ uniqueKeyId }: TopBarProps) {
    const data = await prisma.uniqueKey.findUnique({
        where: { id: uniqueKeyId },
        select: {
            roomName: true,
            name: true,
            user: { select: { name: true } }
        }
    });

    if (!data) return null;

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold">{data.roomName}</h1>
            <div className="text-xs text-muted-foreground">
                {data.user?.name || data.name}
            </div>
        </div>
    );
}

export default TopBar