from api.models.issue import Issues


def run():
    issue = Issues()
    issue.problem_type = "Default Issue"
    issue.severity = "1"
    issue.save()


if __name__ == "__main__":
    run()
