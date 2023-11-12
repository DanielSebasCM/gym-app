class RoutineTemplate {
  final String id;
  final String title;
  final String? description;

  RoutineTemplate({required this.id, required this.title, this.description});

  factory RoutineTemplate.fromJson(Map<String, dynamic> json) {
    return RoutineTemplate(
      id: json['routineTemplateId'] as String,
      title: json['title'] as String,
      description: json['description'] as String?,
    );
  }
}
