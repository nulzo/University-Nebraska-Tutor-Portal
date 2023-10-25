from backend.src.api.models.professor import Professor
for i in range(10):
    print("gere")
    p = Professor()
    p.email = "tt@tee.com"
    p.first_name = f"#{i}-Tee"
    p.last_name = "mama"
    p.is_active = True
    p.professor_id = str(hash(i))
    p.full_name = f"{i}-Test-Professor"
    p.save()
