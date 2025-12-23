from django.db import models
import uuid
# Create your models here.

class Category(models.Model):
  name=models.CharField(max_length=100, unique=True)
  description= models.TextField(blank=True)

  def __str__(self):
    return self.name
  
def generate_sku():
    return str(uuid.uuid4()).split("-")[0].upper()
class Product(models.Model):
  name=models.CharField(max_length=200)
  category=models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="products")
  sku=models.CharField(max_length=20, unique=True, default=generate_sku)
  quantity=models.PositiveIntegerField(default=0)
  reorder_level=models.PositiveIntegerField(default=5)
  cost_price=models.DecimalField(max_digits=10, decimal_places=2)
  selling_price=models.DecimalField(max_digits=10, decimal_places=2)
  created_at=models.DateTimeField(auto_now_add=True)
  updated_at=models.DateTimeField(auto_now=True)

  @property
  def is_low_stock(self):
     return self.quantity <=self.reorder_level
  
  def __str__(self):
     return f"{self.name}({self.sku})"
