from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine
from app.db.base import Base
from app.models.admin import Admin
from app.models.invitation import Invitation
from app.models.event import Event
from app.models.family import FamilyMember
from app.models.gallery import GalleryImage
from app.core.security import get_password_hash

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Seed Admin
        admin_email = "admin@pellipatrika.com"
        admin = db.query(Admin).filter(Admin.email == admin_email).first()
        if not admin:
            admin = Admin(
                email=admin_email,
                password_hash=get_password_hash("admin123")
            )
            db.add(admin)
            db.commit()
            print("Seeded default admin: admin@pellipatrika.com / admin123")

        # Seed Demo Invitation
        invitation = db.query(Invitation).filter(Invitation.slug == "rahul-priya").first()
        if not invitation:
            demo_invitation = Invitation(
                slug="rahul-priya",
                groom_name="రాహుల్ (Rahul)",
                bride_name="ప్రియ (Priya)",
                groom_photo="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
                bride_photo="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
                couple_photo="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
                wedding_date="2026-11-20",
                wedding_time="10:30 AM",
                venue_name="శ్రీ వెంకటేశ్వర స్వామి కళ్యాణ మంటపం (Sri Venkateswara Swamy Kalyana Mandapam)",
                venue_address="రోడ్ నెం. 12, బంజారా హిల్స్, హైదరాబాద్, తెలంగాణ - 500034",
                google_maps_url="https://maps.google.com/?q=Banjara+Hills+Hyderabad",
                template_id="traditional",
                background_music_url="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-11234.mp3",
                invitation_text="శ్రీరస్తు శుభమస్తు అభయహస్తు.\nమా ప్రియమైన కుమారుడు రాహుల్ మరియు ప్రియమైన కుమార్తె ప్రియ ల వివాహ మహోత్సవానికి మీ కుటుంబ సమేతంగా విచ్చేసి నూతన వధూవరులను ఆశీర్వదించవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.",
                status="PUBLISHED"
            )
            db.add(demo_invitation)
            db.flush()

            # Seed Events
            events = [
                Event(
                    invitation_id=demo_invitation.id,
                    title="పెళ్లికూతురు చేయడం (Pellikuthuru)",
                    date="2026-11-19",
                    time="09:00 AM",
                    venue="వధూ గృహము, హైదరాబాద్",
                    description="సాంప్రదాయ పద్ధతిలో వధువుని అలంకరించే శుభకార్యం.",
                    display_order=1
                ),
                Event(
                    invitation_id=demo_invitation.id,
                    title="మెహందీ & సంగీత్ (Mehendi & Sangeet)",
                    date="2026-11-19",
                    time="06:00 PM",
                    venue="గ్రాండ్ గార్డెన్స్, జూబ్లీ హిల్స్",
                    description="సంగీతం, నృత్యాలు మరియు మెహందీ సంబరాలు.",
                    display_order=2
                ),
                Event(
                    invitation_id=demo_invitation.id,
                    title="మాంగల్య ధారణ వివాహ మహోత్సవం (Wedding Ceremony)",
                    date="2026-11-20",
                    time="10:30 AM (సుముహూర్తం)",
                    venue="శ్రీ వెంకటేశ్వర స్వామి కళ్యాణ మంటపం",
                    description="శుభ సుముహూర్తమున లగ్న పత్రిక ప్రకారం వివాహ క్రతువు.",
                    display_order=3
                ),
                Event(
                    invitation_id=demo_invitation.id,
                    title="వివాహ విందు & సత్కారం (Grand Reception)",
                    date="2026-11-20",
                    time="07:00 PM",
                    venue="హోటల్ దసపల్లా, హైదరాబాద్",
                    description="వధూవరుల పరిచయం మరియు రుచికరమైన విందు సత్కారం.",
                    display_order=4
                )
            ]
            db.add_all(events)

            # Seed Family Members
            family = [
                FamilyMember(
                    invitation_id=demo_invitation.id,
                    name="శ్రీమతి & శ్రీ వెంకటేశ్వర్లు (వరస తండ్రి/తల్లి)",
                    relation="వధువు తల్లిదండ్రులు",
                    side="bride",
                    display_order=1
                ),
                FamilyMember(
                    invitation_id=demo_invitation.id,
                    name="శ్రీమతి & శ్రీ రామచంద్రరావు",
                    relation="వరుడి తల్లిదండ్రులు",
                    side="groom",
                    display_order=2
                )
            ]
            db.add_all(family)

            # Seed Gallery Images
            gallery = [
                GalleryImage(
                    invitation_id=demo_invitation.id,
                    image_url="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                    display_order=1
                ),
                GalleryImage(
                    invitation_id=demo_invitation.id,
                    image_url="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
                    display_order=2
                ),
                GalleryImage(
                    invitation_id=demo_invitation.id,
                    image_url="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
                    display_order=3
                )
            ]
            db.add_all(gallery)

            db.commit()
            print("Seeded demo wedding invitation: 'rahul-priya'")

    except Exception as e:
        print(f"Error seeding DB: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
